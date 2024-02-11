import { QueryInterface } from 'sequelize';

/**
 * db:seed:all
 * Fills the tables with a random data.
 */
export async function up(queryInterface: QueryInterface) {
  try {
    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        login: 'gbarkaway0',
        password: 'ElMAJlb3d4dg',
        age: 18,
        isDeleted: true,
      },
      {
        id: 2,
        login: 'fwileman1',
        password: 'QAy4U2Wvf',
        age: 62,
        isDeleted: true,
      },
      {
        id: 3,
        login: 'rbeveredge2',
        password: '2oIQ7Vv',
        age: 37,
        isDeleted: true,
      },
      {
        id: 4,
        login: 'dmcreynold3',
        password: 'ZqPyQZgg0Z6',
        age: 41,
        isDeleted: true,
      },
      {
        id: 5,
        login: 'jafar',
        password: '12345',
        age: 25,
        isDeleted: false,
      },
    ]);

    await queryInterface.bulkInsert('Groups', [
      {
        id: 1,
        name: 'root',
        permissions: 'read',
      },
      {
        id: 2,
        name: 'admin',
        permissions: 'read',
      },
      {
        id: 3,
        name: 'guest',
        permissions: 'delete',
      },
    ]);

    await queryInterface.bulkInsert('UserGroups', [
      {
        userId: 5,
        groupId: 1,
      },
      {
        userId: 2,
        groupId: 2,
      },
      {
        userId: 3,
        groupId: 3,
      },
    ]);
  } catch (e) {
    return Promise.reject(e);
  }
}

/**
 * db:seed:undo:all
 * Erases all data from he tables.
 */
export async function down(queryInterface: QueryInterface) {
  try {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Groups', null, {});
    await queryInterface.bulkDelete('UserGroups', null, {});
  } catch (e) {
    return Promise.reject(e);
  }
}
