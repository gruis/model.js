import Model from '@/model';

class Media extends Model {
  attributes () {
    return {
      id: Number,
      name: String,
      alternativeText: String,
      caption: String,
      width: Number,
      height: Number,
      formats: Formats,
      hash: String,
      ext: String,
      mime: String,
      size: Number,
      url: String,
      previewUrl: String,
      provider: String,
      provider_metadata: null,
      created_at: Date,
      updated_at: Date
    };
  }
};

class Formats extends Model {
  attributes () {
    return {
      thumbnail: Format,
      large: Format,
      medium: Format,
      small: Format
    };
  }
};

class Format extends Model {
  attributes () {
    return {
      hash: String,
      ext: String,
      mime: String,
      width: Number,
      height: Number,
      size: Number,
      url: String
    };
  }
};

export { Media, Formats, Format };
export default { Media, Formats, Format };
