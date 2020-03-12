import axios from './http';

function voteAdd () {
  return axios.post('/insterVote', {
    xxx: 'xxx'
  });
}

export default {
  voteAdd
}