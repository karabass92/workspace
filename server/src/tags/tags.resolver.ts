import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import { TagService } from './tags.service'
import { Tag } from './tags.entity'
import { CreateTagInput } from './inputs/create-tag.input'
import { UpdateTagInput } from './inputs/update-tag.input'


@Resolver()
export class TagResolver {
    constructor(
        private readonly tagService: TagService
    ) { }

    @Mutation(() => Tag)
    async createTag(@Args('createTag') createTagInput: CreateTagInput): Promise<Tag> {
        try {
            return await this.tagService.create(createTagInput)
        } catch (error) {
            console.log(error)
        }
    }

    @Mutation(() => Tag)
    async updateTag(@Args('updateTag') updateTagInput: UpdateTagInput): Promise<Tag> {
        try {
            return await this.tagService.update(updateTagInput)
        } catch (error) {
            console.error(error)
        }
    }

    @Mutation(() => Number)
    async removeTag(@Args('id') id: number): Promise<number> {
        try {
            return await this.tagService.remove(id)
        } catch (error) {
            console.error(error)
        }
    }

    @Query(() => Tag)
    async getOneTag(@Args('id') id: number): Promise<Tag> {
        try {
            return await this.tagService.getOne(id)
        } catch (error) {
            console.error(error)
        }
    }

    @Query(() => [Tag])
    async getAllTags(): Promise<Tag[]> {
        try {
            return await this.tagService.getAll()
        } catch (error) {
            console.error(error)
        }
    }
}