import { GitHubProject } from '../models/github-project.model'
import { GitHubApi } from '../external-apis/github.api'
import { GitHubRepository } from '../models/github-repository.model'
import { RepositoryTagType } from '../enums/repository-tag-type.enum'
import { RepositoryTagLogic } from '../logic/repository-tag.logic'

export class ProjectService {
    public static async getProjects(): Promise<GitHubProject[]> {
        const [ projects, repositories ] = await Promise.all([ GitHubApi.getProjects(), this.getRepositories() ])

        projects.forEach(project => {
            project.repositories = repositories.filter(repo => repo.projectId === project.id)
        })

        return projects
    }

    public static async getRepositories(): Promise<GitHubRepository[]> {
        const repositories = await GitHubApi.getRepositories()
        repositories.forEach(repository => {
            repository.technologies = []
            repository.skills = []
            repository.tags.forEach(tag => {
                const { type, title } = RepositoryTagLogic.destructureTag(tag)

                switch (type) {
                case RepositoryTagType.Technology: {
                    repository.technologies.push(title)
                    break
                }
                case RepositoryTagType.Skill: {
                    repository.skills.push(title)
                    break
                }
                case RepositoryTagType.Project: {
                    repository.projectId = Number(title)
                    break
                }
                case RepositoryTagType.CICD: {
                    repository.cicd = title
                    break
                }
                case RepositoryTagType.Cloud: {
                    repository.cloudInfrastructure = title
                    break
                }
                }
            })
        })

        return repositories
    }
}
