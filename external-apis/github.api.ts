import { Octokit } from '@octokit/core'
import { GitHubConfig } from '../config/github.config'
import { GitHubProject } from '../models/github-project.model'
import { GitHubRepository } from '../models/github-repository.model'

export class GitHubApi {
    private static octokitClient = new Octokit({ auth: GitHubConfig.authenticationToken })

    public static async getRepositories(): Promise<GitHubRepository[]> {
        const result = await this.octokitClient.request('GET /users/{username}/repos', {
            username: GitHubConfig.username
        })

        return result.data.map(currentRepository => {
            const repository = new GitHubRepository()
            repository.id = currentRepository.id
            repository.name = currentRepository.name
            repository.description = currentRepository.description
            repository.url = currentRepository.html_url
            repository.forkCount = currentRepository.forks_count
            repository.starCount = currentRepository.stargazers_count
            repository.watcherCount = currentRepository.watchers_count
            repository.openIssueCount = currentRepository.open_issues_count
            repository.tags = currentRepository.topics
            repository.createdAt = new Date(currentRepository.created_at).getTime() / 1000
            repository.updatedAt = new Date(currentRepository.updated_at).getTime() / 1000
            
            return repository
        })
    }

    public static async getProjects(): Promise<GitHubProject[]> {
        const result = await this.octokitClient.request('GET /users/{username}/projects', {
            username: GitHubConfig.username
        })

        return result.data.map(currentProject => {
            const project = new GitHubProject()
            project.id = currentProject.id
            project.name = currentProject.name
            project.description = currentProject.body
            project.repositories = undefined
            project.createdAt = new Date(currentProject.created_at).getTime() / 1000
            project.updatedAt = new Date(currentProject.updated_at).getTime() / 1000
            
            return project
        })
    }
}
