import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Tag } from './tags.entity'
import { CreateTagInput } from './inputs/create-tag.input'
import { UpdateTagInput } from './inputs/update-tag.input'


@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>
    ) { }

    private async validateTag(name?: string, id?: number): Promise<void> {
        if (name) {
            const tagName = await this.tagRepository.findOneBy({ name })
            if (tagName) throw new BadRequestException('Тег с таким наименованием уже заведен!')
        }
        if (id) {
            const tagId = await this.tagRepository.findOneBy({ id: id })
            if (!tagId) throw new BadRequestException('Тег с таким id номером не найден!')
        }
    }

    private modifyName(name: string): string {
        try {
            return `#${name.trim().toLowerCase()}` 
        } catch (error) {
            console.error(error)
        }
    }

    async create(createTagInput: CreateTagInput): Promise<Tag> {
        try {
            const name = this.modifyName(createTagInput.name)
            await this.validateTag(name)
            return await this.tagRepository.save({ name })
        } catch (error) {
            console.error(error)
        }
    }

    async update(updateTagInput: UpdateTagInput): Promise<Tag> {
        try {
            const name = this.modifyName(updateTagInput.name)
            await this.validateTag(name, updateTagInput.id)
            await this.tagRepository.update(
                { id: updateTagInput.id },
                { name: name }
            )
            return await this.getOne(updateTagInput.id)
        } catch (error) {
            console.error(error)
        }
    }

    async remove(id: number): Promise<number> {
        try {
            await this.validateTag('', id)
            await this.tagRepository.delete({ id })
            return id
        } catch (error) {
            console.error(error)
        }
    }

    async getOne(id: number): Promise<Tag> {
        try {
            await this.validateTag('', id)
            return await this.tagRepository.findOneBy({ id })
        } catch (error) {
            console.error(error)
        }
    }

    async getAll(): Promise<Tag[]> {
        try {
            return await this.tagRepository.find({ order: { id: 'ASC' } })
        } catch (error) {
            console.error(error)
        }
    }
}