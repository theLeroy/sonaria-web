import { graphql } from './generated'

graphql(`
  fragment Asset on AssetInterface {
    id
    permalink
    extension
    is_image
    is_video
    is_audio
    width
    height
    focus_css

    ... on Asset_Assets {
      alt_fr
      alt_de
    }
  }
`)
