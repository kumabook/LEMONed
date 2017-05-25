export const schema = {
  title: 'Track',
  type:  'object',

  properties: {
    id:           { type: 'integer' },
    artistId:     { type: 'integer' },
    url:          { type: 'string' },
    title:        { type: 'string' },
    description:  { type: 'string' },
    thumbnailUrl: { type: 'string', format: 'data-url' },
    artworkUrl:   { type: 'string', format: 'data-url' },
    audioUrl:     { type: 'string', format: 'data-url' },
    publishedAt:  { type: 'string', format: 'date-time' },
  },
  required:    [],
  primaryKeys: ['id'],
};

export const tableSchema = {
  url:          { 'ui:widget': 'hidden' },
  description:  { 'ui:widget': 'hidden' },
  thumbnailUrl: { 'ui:widget': 'img' },
  artworkUrl:   { 'ui:widget': 'hidden' },
  audioUrl:     { 'ui:widget': 'audio' },
  publishedAt:  { 'ui:widget': 'hidden' },
};

export const formSchema = {
  id:           { 'ui:widget': 'hidden' },
  description:  { 'ui:options': { multiLine: true } },
  thumbnailUrl: { 'ui:widget': 's3-uploader' },
  artworkUrl:   { 'ui:widget': 's3-uploader' },
  audioUrl:     { 'ui:widget': 's3-uploader' },
};
