import { generateHash } from 'src/common/utils';
import { v4 as uuidv4 } from 'uuid';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { User } from '../entities/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  beforeInsert(event: InsertEvent<User>) {
    if (event.entity.password) {
      event.entity.password = generateHash(event.entity.password);
    }
    event.entity.clientId = uuidv4();
    event.entity.apikey = generateHash(event.entity.email);
  }
}
