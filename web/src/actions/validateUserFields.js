import api from '../api';

//For instant async server validation
export const asyncValidate = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    if (values.username.length == 0){
      resolve();
    }
    else {
      const request = api.post('/validate-user', { user: values })
        .then((response) => {
          let data = response.data;
          let status = response.status;
          //if there is an error
          if(status != "ok" || data.username  ) {
            //let other comps know of error by updating redux` state
            reject(data); //this is for redux-form itself
          } else {
            //let other comps know success by updating redux` state
            //dispatch(response.payload);
            resolve(data);//this is for redux-form itself
          }
        }); //dispatch
    }
  }); //promise
};
