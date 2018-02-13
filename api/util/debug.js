import createDebug from 'debug';

export default module => {
  const debug = createDebug(module);
  debug.enabled = process.env.NODE_ENV !== 'production';
  return debug;
};
