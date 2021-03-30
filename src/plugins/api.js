import memory from '@/api/memory';
export default (_, inject) => {
  inject("api", {
    memory
  });
};
