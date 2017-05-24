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
  required:    [],
  listing:     ['id', 'name', 'url', 'thumbnailUrl'],
  primaryKeys: ['id'],
};
