import { getCustomRepository } from 'typeorm';
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories';
import { UsersRepositories } from '../repositories/UsersRepositories';

interface IComplimentRequest {
  tag_id: string
  user_sender: string
  user_receiver: string
  message: string
}

class CreateComplimentService {
  async execute({tag_id, user_sender, user_receiver, message}: IComplimentRequest){
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories)
    const usersRepositories = getCustomRepository(UsersRepositories)

    if(user_sender === user_receiver){
     throw new Error("Incorrect user receiver") 
    }

    const userReceiverExists = await usersRepositories.findOne(user_receiver)

    if(!userReceiverExists){
      throw new Error("User receiver does not exists")
    }

    const compliment = complimentsRepositories.create({
      tag_id,
      user_receiver,
      user_sender,
      message
    })

    await complimentsRepositories.save(compliment)

    return compliment
  }
}

export { CreateComplimentService }







/*import { ComplimentRepositories } from "../repositories/ComplimentsRepository"
import { UsersRepositories } from "../repositories/UsersRepositories";

interface ComplimentRequest{
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string
}

export class CreateComplimentService{
    async execute({tag_id, user_sender, user_receiver, message}: ComplimentRequest){
        const complimentRepository = new ComplimentRepositories;
        const userRepository = new UsersRepositories;

        if(user_sender === user_receiver){
            throw new Error("User sender and user receiver are the same");
        }

        const userReceiverExists = userRepository.findOne({id: user_receiver});

        if(!userReceiverExists){
            throw new Error("User receiver not found");
        }

        
        const compliment = complimentRepository.create({tag_id, user_sender, user_receiver, message});

        await complimentRepository.save(compliment);

        return compliment;
    }
}*/