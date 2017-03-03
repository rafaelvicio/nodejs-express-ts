import * as Promise from 'bluebird';
import * as Sequelize from 'sequelize';
import * as uuid from 'node-uuid';

export interface IUserAttributes {
  id?: string;
  name?: string;
  email?: string;
}

export interface IUserInstance extends Sequelize.Instance<IUserAttributes>, IUserAttributes { }

export interface IUserModel extends Sequelize.Model<IUserInstance, IUserAttributes> { }

export class UserDAO {
  private userModel: IUserModel;

  constructor(private sequelize: Sequelize.Sequelize) {
    this.userModel = this.sequelize.define<IUserInstance, IUserAttributes>('User', {
      'id': {
        'type': Sequelize.UUID,
        'allowNull': false,
        'primaryKey': true
      },
      'name': {
        'type': Sequelize.STRING(128),
        'allowNull': false
      },
      'email': {
        'type': Sequelize.STRING(128),
        'allowNull': false,
        'unique': true,
        'validate': {
          'isEmail': true
        }
      },
    },
      {
        // http://stackoverflow.com/questions/338156/table-naming-dilemma-singular-vs-plural-names
        'tableName': 'user',

        'timestamps': true,
        'createdAt': 'created_at',
        'updatedAt': 'updated_at',
      });
  }

  register(name: string, email: string): Promise<IUserInstance> {
    return this.sequelize.transaction((transaction: Sequelize.Transaction) => {
      let userId = uuid.v4();
      return this.userModel
        .create({
          id: userId,
          name: name,
          email: email,
        }, { transaction: transaction })
    });
  }

  getUserById(id: string): Promise<IUserInstance> {
    return this.userModel.find({ where: { id: id } });
  }

  getUserByEmail(email: string): Promise<IUserInstance> {
    return this.userModel.find({ where: { email: email } });
  }

  list(): Promise<IUserInstance[]> {
    return this.userModel.all();
  }
}
