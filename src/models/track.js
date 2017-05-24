export const schema = {
  title: 'Track',
  type:  'object',

  properties: {
    id:           { type: 'integer' },
    artistId:     { type: 'integer' },
    url:          { type: 'string' },
    title:        { type: 'string' },
    description:  { type: 'string' },
    thumbnailUrl: { type: 'string', format: 'data-url', contentType: 'image' },
    artworkUrl:   { type: 'string', format: 'data-url', contentType: 'image' },
    audioUrl:     { type: 'string', format: 'data-url', contentType: 'audio' },
    publishedAt:  { type: 'string', format: 'date-time' },
  },
  required:    [],
  listing:     ['id', 'artistId', 'title', 'thumbnailUrl', 'audioUrl'],
  primaryKeys: ['id'],
};
