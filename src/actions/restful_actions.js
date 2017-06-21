const methods = [
  'index',
  'get',
  'create',
  'update',
  'destroy',
];

const events = [
  'start',
  'success',
  'failure',
];
export default (schema) => {
  const actions = { creators: {} };
  methods.forEach((name) => {
    actions[name] = {};
    actions.creators[name] = {};
    events.forEach((event) => {
      const type = `${schema.title}/${name}/${event}`;
      actions[name][event] = type;
      actions.creators[name][event] = payload => ({ type, payload });
    });
  });
  return actions;
};
