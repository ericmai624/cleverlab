import Router from 'next/router';

export default (res, target) => {
  if (res) {
    res.redirect(303, target);
    /*
      res.finished is for Next.js
      setting to true will signal Next.js that 
      you have handled the entire request/response lifecycle
      so it will not continue writing to the response
    */
    res.finished = true;
  } else {
    Router.replace(target);
  }
};
