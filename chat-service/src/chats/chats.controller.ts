import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Controller()
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @MessagePattern('createChat')
  create(@Payload() createChatDto: CreateChatDto) {
    return this.chatsService.create(createChatDto);
  }

  @MessagePattern('findAllChats')
  findAll() {
    return this.chatsService.findAll();
  }

  @MessagePattern('findOneChat')
  findOne(@Payload() id: number) {
    return this.chatsService.findOne(id);
  }

  @MessagePattern('updateChat')
  update(@Payload() updateChatDto: UpdateChatDto) {
    return this.chatsService.update(updateChatDto.id, updateChatDto);
  }

  @MessagePattern('removeChat')
  remove(@Payload() id: number) {
    return this.chatsService.remove(id);
  }
}
