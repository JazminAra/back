import { QueryInterface, DataTypes } from 'sequelize';
// import { Permission } from '../../../modules/groups/dto/group.dto';

/**
 * db:migrate
 * Creates the necessary tables.
 */
export async function up(query: QueryInterface) {
  try {
    await query.createTable('Users', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      login: {
        type: new DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: new DataTypes.STRING(255),
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    });

    await query.createTable('Groups', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: new DataTypes.STRING(255),
        allowNull: false,
      },
      // permissions: {
      //   type: new DataTypes.ENUM(...Object.values(Permission)),
      //   allowNull: false,
      // },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
    });

    await query.createTable('UserGroups', {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      groupId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Groups',
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
    });
  } catch (e) {
    return Promise.reject(e);
  }
}

/**
 * db:migrate:undo:all
 * Destroys the created tales.
 */
export async function down(query: QueryInterface) {
  try {
    await query.dropTable('Posts');
    await query.dropTable('Users');
    await query.dropTable('UserGroups');
  } catch (e) {
    return Promise.reject(e);
  }
}
