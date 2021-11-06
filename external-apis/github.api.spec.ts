import * as sinon from 'sinon'
import { GitHubApi } from './github.api'
import { SinonStub } from 'sinon'
import { GitHubRepository } from '../models/github-repository.model'
import { GitHubProject } from '../models/github-project.model'

const mockRepositories = [
    {
        'id': 1296269,
        'node_id': 'MDEwOlJlcG9zaXRvcnkxMjk2MjY5',
        'name': 'Hello-World',
        'full_name': 'octocat/Hello-World',
        'owner': {
            'login': 'octocat',
            'id': 1,
            'node_id': 'MDQ6VXNlcjE=',
            'avatar_url': 'https://github.com/images/error/octocat_happy.gif',
            'gravatar_id': '',
            'url': 'https://api.github.com/users/octocat',
            'html_url': 'https://github.com/octocat',
            'followers_url': 'https://api.github.com/users/octocat/followers',
            'following_url': 'https://api.github.com/users/octocat/following{/other_user}',
            'gists_url': 'https://api.github.com/users/octocat/gists{/gist_id}',
            'starred_url': 'https://api.github.com/users/octocat/starred{/owner}{/repo}',
            'subscriptions_url': 'https://api.github.com/users/octocat/subscriptions',
            'organizations_url': 'https://api.github.com/users/octocat/orgs',
            'repos_url': 'https://api.github.com/users/octocat/repos',
            'events_url': 'https://api.github.com/users/octocat/events{/privacy}',
            'received_events_url': 'https://api.github.com/users/octocat/received_events',
            'type': 'User',
            'site_admin': false
        },
        'private': false,
        'html_url': 'https://github.com/octocat/Hello-World',
        'description': 'This your first repo!',
        'fork': false,
        'url': 'https://api.github.com/repos/octocat/Hello-World',
        'archive_url': 'https://api.github.com/repos/octocat/Hello-World/{archive_format}{/ref}',
        'assignees_url': 'https://api.github.com/repos/octocat/Hello-World/assignees{/user}',
        'blobs_url': 'https://api.github.com/repos/octocat/Hello-World/git/blobs{/sha}',
        'branches_url': 'https://api.github.com/repos/octocat/Hello-World/branches{/branch}',
        'collaborators_url': 'https://api.github.com/repos/octocat/Hello-World/collaborators{/collaborator}',
        'comments_url': 'https://api.github.com/repos/octocat/Hello-World/comments{/number}',
        'commits_url': 'https://api.github.com/repos/octocat/Hello-World/commits{/sha}',
        'compare_url': 'https://api.github.com/repos/octocat/Hello-World/compare/{base}...{head}',
        'contents_url': 'https://api.github.com/repos/octocat/Hello-World/contents/{+path}',
        'contributors_url': 'https://api.github.com/repos/octocat/Hello-World/contributors',
        'deployments_url': 'https://api.github.com/repos/octocat/Hello-World/deployments',
        'downloads_url': 'https://api.github.com/repos/octocat/Hello-World/downloads',
        'events_url': 'https://api.github.com/repos/octocat/Hello-World/events',
        'forks_url': 'https://api.github.com/repos/octocat/Hello-World/forks',
        'git_commits_url': 'https://api.github.com/repos/octocat/Hello-World/git/commits{/sha}',
        'git_refs_url': 'https://api.github.com/repos/octocat/Hello-World/git/refs{/sha}',
        'git_tags_url': 'https://api.github.com/repos/octocat/Hello-World/git/tags{/sha}',
        'git_url': 'git:github.com/octocat/Hello-World.git',
        'issue_comment_url': 'https://api.github.com/repos/octocat/Hello-World/issues/comments{/number}',
        'issue_events_url': 'https://api.github.com/repos/octocat/Hello-World/issues/events{/number}',
        'issues_url': 'https://api.github.com/repos/octocat/Hello-World/issues{/number}',
        'keys_url': 'https://api.github.com/repos/octocat/Hello-World/keys{/key_id}',
        'labels_url': 'https://api.github.com/repos/octocat/Hello-World/labels{/name}',
        'languages_url': 'https://api.github.com/repos/octocat/Hello-World/languages',
        'merges_url': 'https://api.github.com/repos/octocat/Hello-World/merges',
        'milestones_url': 'https://api.github.com/repos/octocat/Hello-World/milestones{/number}',
        'notifications_url': 'https://api.github.com/repos/octocat/Hello-World/notifications{?since,all,participating}',
        'pulls_url': 'https://api.github.com/repos/octocat/Hello-World/pulls{/number}',
        'releases_url': 'https://api.github.com/repos/octocat/Hello-World/releases{/id}',
        'ssh_url': 'git@github.com:octocat/Hello-World.git',
        'stargazers_url': 'https://api.github.com/repos/octocat/Hello-World/stargazers',
        'statuses_url': 'https://api.github.com/repos/octocat/Hello-World/statuses/{sha}',
        'subscribers_url': 'https://api.github.com/repos/octocat/Hello-World/subscribers',
        'subscription_url': 'https://api.github.com/repos/octocat/Hello-World/subscription',
        'tags_url': 'https://api.github.com/repos/octocat/Hello-World/tags',
        'teams_url': 'https://api.github.com/repos/octocat/Hello-World/teams',
        'trees_url': 'https://api.github.com/repos/octocat/Hello-World/git/trees{/sha}',
        'clone_url': 'https://github.com/octocat/Hello-World.git',
        'mirror_url': 'git:git.example.com/octocat/Hello-World',
        'hooks_url': 'https://api.github.com/repos/octocat/Hello-World/hooks',
        'svn_url': 'https://svn.github.com/octocat/Hello-World',
        'homepage': 'https://github.com',
        'language': '',
        'forks_count': 9,
        'stargazers_count': 80,
        'watchers_count': 80,
        'size': 108,
        'default_branch': 'master',
        'open_issues_count': 0,
        'is_template': false,
        'topics': [
            'octocat',
            'atom',
            'electron',
            'api'
        ],
        'has_issues': true,
        'has_projects': true,
        'has_wiki': true,
        'has_pages': false,
        'has_downloads': true,
        'archived': false,
        'disabled': false,
        'visibility': 'public',
        'pushed_at': '2011-01-26T19:06:43Z',
        'created_at': '2011-01-26T19:01:12Z',
        'updated_at': '2011-01-26T19:14:43Z',
        'permissions': {
            'admin': false,
            'push': false,
            'pull': true
        },
        'template_repository': ''
    }
]

const mockProjects = [
    {
        'owner_url': 'https://api.github.com/users/octocat',
        'url': 'https://api.github.com/projects/1002603',
        'html_url': 'https://github.com/users/octocat/projects/1',
        'columns_url': 'https://api.github.com/projects/1002603/columns',
        'id': 1002603,
        'node_id': 'MDc6UHJvamVjdDEwMDI2MDM=',
        'name': 'My Projects',
        'body': 'A board to manage my personal projects.',
        'number': 1,
        'state': 'open',
        'creator': {
            'login': 'octocat',
            'id': 1,
            'node_id': 'MDQ6VXNlcjE=',
            'avatar_url': 'https://github.com/images/error/octocat_happy.gif',
            'gravatar_id': '',
            'url': 'https://api.github.com/users/octocat',
            'html_url': 'https://github.com/octocat',
            'followers_url': 'https://api.github.com/users/octocat/followers',
            'following_url': 'https://api.github.com/users/octocat/following{/other_user}',
            'gists_url': 'https://api.github.com/users/octocat/gists{/gist_id}',
            'starred_url': 'https://api.github.com/users/octocat/starred{/owner}{/repo}',
            'subscriptions_url': 'https://api.github.com/users/octocat/subscriptions',
            'organizations_url': 'https://api.github.com/users/octocat/orgs',
            'repos_url': 'https://api.github.com/users/octocat/repos',
            'events_url': 'https://api.github.com/users/octocat/events{/privacy}',
            'received_events_url': 'https://api.github.com/users/octocat/received_events',
            'type': 'User',
            'site_admin': false
        },
        'created_at': '2011-04-10T20:09:31Z',
        'updated_at': '2014-03-03T18:58:10Z'
    }
]

describe('test GitHubApi', () => {
    describe('test getRepositories', () => {
        let octokitClientRequestStub: SinonStub

        beforeEach(() => {
            octokitClientRequestStub = sinon.stub(GitHubApi['octokitClient'], 'request').resolves({
                data: mockRepositories,
                headers: undefined,
                status: 200,
                url: ''
            })
        })

        afterEach(() => {
            octokitClientRequestStub.restore()
        })

        it('should make a call to retrieve repos', async () => {
            await GitHubApi.getRepositories()

            void expect(octokitClientRequestStub.callCount).toEqual(1)
        })

        it('should map the returned data into a model', async () => {
            const results = await GitHubApi.getRepositories()

            const expectedResult: GitHubRepository[] = [
                {
                    'id': 1296269,
                    'name': 'Hello-World',
                    'description': 'This your first repo!',
                    'url': 'https://github.com/octocat/Hello-World',
                    'forkCount': 9,
                    'starCount': 80,
                    'watcherCount': 80,
                    'openIssueCount': 0,
                    'tags': [
                        'octocat',
                        'atom',
                        'electron',
                        'api'
                    ],
                    'createdAt': new Date('2011-01-26T19:01:12Z').getTime() / 1000,
                    'updatedAt': new Date('2011-01-26T19:14:43Z').getTime() / 1000,
                    'cicd': undefined,
                    'technologies': undefined,
                    'skills': undefined,
                    'cloudInfrastructure': undefined,
                    'projectId': undefined
                }
            ]

            void expect(results.length).toEqual(mockRepositories.length)
            void expect(results[0]).toBeInstanceOf(GitHubRepository)
            void expect(results).toEqual(expectedResult)
        })
    })

    describe('test getProjects', () => {
        let octokitClientRequestStub: SinonStub

        beforeEach(() => {
            octokitClientRequestStub = sinon.stub(GitHubApi['octokitClient'], 'request').resolves({
                data: mockProjects,
                headers: undefined,
                status: 200,
                url: ''
            })
        })

        afterEach(() => {
            octokitClientRequestStub.restore()
        })

        it('should make a call to retrieve repos', async () => {
            await GitHubApi.getProjects()

            void expect(octokitClientRequestStub.callCount).toEqual(1)
        })

        it('should map the returned data into a model', async () => {
            const results = await GitHubApi.getProjects()

            const expectedResult: GitHubProject[] = [
                {
                    id: 1002603,
                    name: 'My Projects',
                    description: 'A board to manage my personal projects.',
                    repositories: undefined,
                    createdAt: new Date('2011-04-10T20:09:31Z').getTime() / 1000,
                    updatedAt: new Date('2014-03-03T18:58:10Z').getTime() / 1000
                }
            ]

            void expect(results.length).toEqual(mockProjects.length)
            void expect(results[0]).toBeInstanceOf(GitHubProject)
            void expect(results).toEqual(expectedResult)
        })
    })
})
