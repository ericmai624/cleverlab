module.exports = models => {
  console.log('setting relations among models');
  const { Student, Teacher, Class } = models;

  Class.belongsToMany(Student, { through: 'Class_Student' });
  Student.belongsToMany(Class, { through: 'Class_Student' });

  Class.belongsToMany(Teacher, { through: 'Class_Teacher' });
  Teacher.belongsToMany(Class, { through: 'Class_Teacher' });
};