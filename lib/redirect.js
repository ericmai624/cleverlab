import Router from 'next/router';

export default (context, target) => {
  if (context.res) {
    context.res.redirect(303, target);
  } else {
    Router.replace(target);
  }
};
