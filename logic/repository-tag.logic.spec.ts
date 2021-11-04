import { RepositoryTagLogic } from './repository-tag.logic'
import { RepositoryTagType } from '../enums/repository-tag-type.enum'

describe('test RepositoryTagLogic', () => {
    describe('test destructureTag', () => {
        it('should return a formatted tag title', () => {
            void expect(RepositoryTagLogic.destructureTag('project-online-portfolio').title).toEqual('Online Portfolio')
            void expect(RepositoryTagLogic.destructureTag('project-mern-aquarium').title).toEqual('Mern Aquarium')
            void expect(RepositoryTagLogic.destructureTag('project-graphql-pokedex').title).toEqual('Graphql Pokedex')
            void expect(RepositoryTagLogic.destructureTag('react').title).toEqual('React')
        })

        it('should return the correct tag type', () => {
            void expect(RepositoryTagLogic.destructureTag('project-online-portfolio').type)
                .toEqual(RepositoryTagType.Project)
            void expect(RepositoryTagLogic.destructureTag('skill-backend-development').type).toEqual(RepositoryTagType.Skill)
            void expect(RepositoryTagLogic.destructureTag('tech-express').type).toEqual(RepositoryTagType.Technology)
            void expect(RepositoryTagLogic.destructureTag('cicd-azure-devops').type).toEqual(RepositoryTagType.CICD)
            void expect(RepositoryTagLogic.destructureTag('cloud-heroku').type).toEqual(RepositoryTagType.Cloud)
            void expect(RepositoryTagLogic.destructureTag('angular').type).toEqual(undefined)
        })
    })

    describe('test formatTagTitle', () => {
        it('should format titles to be capitalized', () => {
            void expect(RepositoryTagLogic.formatTagTitle('online-portfolio')).toEqual('Online Portfolio')
            void expect(RepositoryTagLogic.formatTagTitle('budget-app')).toEqual('Budget App')
            void expect(RepositoryTagLogic.formatTagTitle('food-planner')).toEqual('Food Planner')
        })
    })
})
