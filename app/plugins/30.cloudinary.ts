import CloudinaryImage from '@teamnovu/vue-cloudinary-image'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(CloudinaryImage, {
    cloudinaryBaseUrl: nuxtApp.$config.public.CLOUDINARY_BASE_URL,
  })
})
