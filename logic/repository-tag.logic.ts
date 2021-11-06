import { RepositoryTagType } from '../enums/repository-tag-type.enum'

export class RepositoryTagLogic {
    public static destructureTag(tag: string): { type: RepositoryTagType, title: string } {
        const type = tag.split('-')[0]
        tag = tag.replace(type + '-', '')

        switch (type) {
        case RepositoryTagType.Technology: {
            return {
                type: RepositoryTagType.Technology,
                title: this.formatTagTitle(tag)
            }
        }
        case RepositoryTagType.Skill: {
            return {
                type: RepositoryTagType.Skill,
                title: this.formatTagTitle(tag)
            }
        }
        case RepositoryTagType.Project: {
            return {
                type: RepositoryTagType.Project,
                title: this.formatTagTitle(tag)
            }
        }
        case RepositoryTagType.CICD: {
            return {
                type: RepositoryTagType.CICD,
                title: this.formatTagTitle(tag)
            }
        }
        case RepositoryTagType.Cloud: {
            return {
                type: RepositoryTagType.Cloud,
                title: this.formatTagTitle(tag)
            }
        }
        default: {
            return {
                type: undefined,
                title: this.formatTagTitle(tag)
            }
        }
        }
    }

    public static formatTagTitle(tag: string) {
        let tagTitleSections = tag.split('-')
        tagTitleSections = tagTitleSections.map(section => section[0].toUpperCase() + section.slice(1))
        
        return tagTitleSections.join(' ')
    }
}
