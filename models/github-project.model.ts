import { GitHubRepository } from './github-repository.model'

export class GitHubProject {
    id: number
    name: string
    description: string
    repositories: GitHubRepository[]
    createdAt: number
    updatedAt: number
}
