import path from 'path';
import pluralize from 'pluralize';
import http from './base';

/**
 * Builds api handlers to interact with Aukai REST endpoints for
 * resources.
 * @param String resourceName e.g., 'user'
 * @param Object [endpoints] override the urls used for rest operations - use
 *   this when the APIs endpoints don't conform to the expected pattern
 */
const resource = (resourceName, { Model, endpoints, methods }) => {
  return {
    get (id) {
      return new Promise((resolve, reject) => {
        http[this.methods.read](...this.endpoint('get', id))
          .then((res) => {
            resolve(this.standardize(res));
          })
          .catch((err) => {
            if (err.response && err.response.status === 404) {
              return resolve(undefined);
            }
            reject(err);
          });
      });
    },

    list () {
      return http[this.methods.read](...this.endpoint('list'))
        .then((res) => {
          return res.data.map(c => (this.standardize({ data: c })));
        });
    },

    save (id, payload) {
      if (id) {
        return http[this.methods.update](...this.endpoint('save', id), payload)
          .then(res => (this.standardize(res)));
      }
      return http[this.methods.create](...this.endpoint('save'), payload)
        .then(res => (this.standardize(res)));
    },

    del (id) {
      return http[this.methods.delete](...this.endpoint('del', id))
        .then(res => (this.standardize(res)));
    },

    endpoints: {
      get: id => path.join(resourceName, id),
      list: () => pluralize(resourceName),
      save: id => id ? path.join(resourceName, id) : resourceName,
      del: id => path.join(resourceName, id),
      ...(endpoints || {})
    },

    methods: {
      create: 'post',
      update: 'put',
      read: 'get',
      delete: 'delete',
      ...(methods || {})
    },

    endpoint (name, ...items) {
      const builder = this.endpoints[name];
      if (typeof builder === 'function') {
        const built = builder(...items);
        if (Array.isArray(built)) {
          return [built.shift(), ...built];
        }
        return [built];
      }
      return [builder];
    },

    standardize ({ data = { id: 0 } }) {
      if (Model) {
        return (new Model(data)).valueOf();
      }
      return data.id && data.id > 0 ? data : undefined;
    }
  };
};

export default resource;
