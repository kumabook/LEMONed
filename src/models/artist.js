export const schema = {
  title: 'Artist',
  type:  'object',

  properties: {
    id:           { type: 'integer' },
    name:         { type: 'string' },
    url:          { type: 'string', format: 'uri' },
    thumbnailUrl: { type: 'string', format: 'data-url', contentType: 'image' },
    artworkUrl:   { type: 'string', format: 'data-url', contentType: 'image' },
  },
  required: [],
};

export const tableSchema = {
  url:          { 'ui:widget': 'hidden' },
  thumbnailUrl: { 'ui:widget': 'img' },
  artworkUrl:   { 'ui:widget': 'hidden' },
};

export const formSchema = {
  id:           { 'ui:widget': 'hidden' },
  thumbnailUrl: { 'ui:widget': 's3-uploader' },
  artworkUrl:   { 'ui:widget': 's3-uploader' },
};

