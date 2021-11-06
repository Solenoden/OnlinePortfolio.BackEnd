import * as sinon from 'sinon'
import { GitHubApi } from '../external-apis/github.api'
import { ProjectService } from './project.service'
import { SinonSpy, SinonStub } from 'sinon'
import { GitHubRepository } from '../models/github-repository.model'
import { GitHubProject } from '../models/github-project.model'

const mockRepositories: GitHubRepository[] = [
    {
        name: 'OnlinePortfolio.BackEnd',
        description: '',
        id: 12345,
        createdAt: 0,
        updatedAt: 0,
        openIssueCount: 0,
        watcherCount: 0,
        forkCount: 0,
        starCount: 0,
        url: 'example.co.za',
        cicd: undefined,
        projectId: undefined,
        cloudInfrastructure: undefined,
        skills: undefined,
        technologies: undefined,
        tags: [
            'project-123',
            'tech-angular',
            'tech-html',
            'tech-css',
            'skill-unit-testing',
            'skill-frontend-development',
            'cicd-github-actions',
            'cloud-azure'
        ]
    },
    {
        name: 'OnlinePortfolio.FrontEnd',
        description: '',
        id: 123456,
        createdAt: 0,
        updatedAt: 0,
        openIssueCount: 0,
        watcherCount: 0,
        forkCount: 0,
        starCount: 0,
        url: 'example.co.za',
        cicd: undefined,
        projectId: undefined,
        cloudInfrastructure: undefined,
        skills: undefined,
        technologies: undefined,
        tags: [
            'project-123'
        ]
    }
]

const mockProjects: GitHubProject[] = [
    {
        id: 123,
        name: 'Online Portfolio',
        createdAt: 0,
        updatedAt: 0,
        description: '',
        repositories: undefined
    },
    {
        id: 987,
        name: 'Random Project',
        createdAt: 0,
        updatedAt: 0,
        description: '',
        repositories: undefined
    }
]

describe('test ProjectService', () => {
    describe('test getProjects', () => {
        let githubGetRepositoriesStub: SinonStub
        let githubGetProjectsStub: SinonStub
        let getRepositoriesSpy: SinonSpy

        beforeEach(() => {
            githubGetRepositoriesStub = sinon.stub(GitHubApi, 'getRepositories').resolves(mockRepositories)
            githubGetProjectsStub = sinon.stub(GitHubApi, 'getProjects').resolves(mockProjects)
            getRepositoriesSpy = sinon.spy(ProjectService, 'getRepositories')
        })

        afterEach(() => {
            githubGetRepositoriesStub.restore()
            githubGetProjectsStub.restore()
            getRepositoriesSpy.restore()
        })

        it('should retrieve repositories and projects', async () => {
            await ProjectService.getProjects()

            void expect(githubGetProjectsStub.callCount).toEqual(1)
            void expect(getRepositoriesSpy.callCount).toEqual(1)
        })

        it('should group repositories by projects', async () => {
            const projects = await ProjectService.getProjects()

            const expectedProjects: GitHubProject[] = [
                {
                    id: 123,
                    name: 'Online Portfolio',
                    description: '',
                    updatedAt: 0,
                    createdAt: 0,
                    repositories: [
                        {
                            name: 'OnlinePortfolio.BackEnd',
                            description: '',
                            id: 12345,
                            createdAt: 0,
                            updatedAt: 0,
                            openIssueCount: 0,
                            watcherCount: 0,
                            forkCount: 0,
                            starCount: 0,
                            url: 'example.co.za',
                            cicd: 'Github Actions',
                            projectId: 123,
                            cloudInfrastructure: 'Azure',
                            skills: [
                                'Unit Testing',
                                'Frontend Development'
                            ],
                            technologies: [
                                'Angular',
                                'Html',
                                'Css'
                            ],
                            tags: [
                                'project-123',
                                'tech-angular',
                                'tech-html',
                                'tech-css',
                                'skill-unit-testing',
                                'skill-frontend-development',
                                'cicd-github-actions',
                                'cloud-azure'
                            ]
                        },
                        {
                            name: 'OnlinePortfolio.FrontEnd',
                            description: '',
                            id: 123456,
                            createdAt: 0,
                            updatedAt: 0,
                            openIssueCount: 0,
                            watcherCount: 0,
                            forkCount: 0,
                            starCount: 0,
                            url: 'example.co.za',
                            cicd: undefined,
                            projectId: 123,
                            cloudInfrastructure: undefined,
                            skills: [],
                            technologies: [],
                            tags: [
                                'project-123'
                            ]
                        }
                    ]
                },
                {
                    id: 987,
                    name: 'Random Project',
                    description: '',
                    updatedAt: 0,
                    createdAt: 0,
                    repositories: []
                }
            ]

            void expect(projects).toEqual(expectedProjects)
        })
    })

    describe('test getRepositories', () => {
        let getRepositoriesStub: SinonStub

        beforeEach(() => {
            getRepositoriesStub = sinon.stub(GitHubApi, 'getRepositories').resolves(mockRepositories)
        })

        afterEach(() => {
            getRepositoriesStub.restore()
        })

        it('should make a call to GitHub to retrieve repositories', async () => {
            await ProjectService.getRepositories()

            void expect(getRepositoriesStub.callCount).toEqual(1)
        })

        it('should set the project field when one of the repository\'s tags is of type project', async () => {
            const repositories = await ProjectService.getRepositories()

            void expect(repositories[0].projectId).toEqual(123)
        })

        it('should set the cicd field when one of the repository\'s tags is of type cicd', async () => {
            const repositories = await ProjectService.getRepositories()

            void expect(repositories[0].cicd).toEqual('Github Actions')
        })

        it('should set the cloud infrastructure field when one of the repository\'s tags is of type cloud', async () => {
            const repositories = await ProjectService.getRepositories()

            void expect(repositories[0].cloudInfrastructure).toEqual('Azure')
        })

        it('should populate the technologies array with tags of type technology', async () => {
            const repositories = await ProjectService.getRepositories()

            void expect(repositories[0].technologies.length).toEqual(3)
            void expect(repositories[0].technologies).toEqual([
                'Angular',
                'Html',
                'Css'
            ])
        })

        it('should populate the skills array with tags of type skill', async () => {
            const repositories = await ProjectService.getRepositories()

            void expect(repositories[0].skills.length).toEqual(2)
            void expect(repositories[0].skills).toEqual([
                'Unit Testing',
                'Frontend Development'
            ])
        })
    })
})
