<template>
  <div class="fect-doc__home-page">
    <div class="top">
      <fe-imageBrowser url="https://vue.miaya.art">
        <p>
          Fect is a Vue UI Library with beautifully handcrafted Vercel Component.No design skills required — everything
          you need to create amazing applications is at your fingertips
        </p>
      </fe-imageBrowser>
    </div>

    <fe-row align="middle" justify="space-around" class="fect-doc__description">
      <!--  -->
      <fe-col :span="6">
        <fe-link :to="routeHandler('guide')">
          <fe-card shadow hoverable>
            <h4>
              <div class="feature_icon">
                <package />
              </div>
              Guide
            </h4>
            <p>View the design guidelines.</p>
          </fe-card>
        </fe-link>
      </fe-col>
      <!--  -->
      <fe-col :span="6">
        <fe-link :to="routeHandler('components')">
          <fe-card shadow hoverable>
            <h4>
              <div class="feature_icon">
                <feather />
              </div>
              Components
            </h4>
            <p>Ever-increasing list of concise and aesthetic components.</p>
          </fe-card>
        </fe-link>
      </fe-col>
      <!--  -->
      <fe-col :span="6">
        <fe-link :href="routeHandler()" target="_blank">
          <fe-card shadow hoverable>
            <h4>
              <div class="feature_icon">
                <github />
              </div>
              Open Sourced
            </h4>
            <p>Fect is open sourced and available free under MIT licence.</p>
          </fe-card>
        </fe-link>
      </fe-col>
    </fe-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { webSiteProvide, WEB_SITE_KEY } from '../utils/website-context'
import { useProvider } from '@fect-ui/vue-hooks'

export default defineComponent({
  name: 'Home',
  setup() {
    const { context } = useProvider<webSiteProvide>(WEB_SITE_KEY)
    return {
      routeHandler: context!.parentRouteHandler,
    }
  },
})
</script>

<style lang="less" scoped>
.fect-doc {
  &__home-page {
    width: 100%;
    position: relative;
    top: 50px;

    .top {
      width: 50%;
      margin: 0 auto;

      p {
        margin: 0;
        color: var(--accents-6);
        font-size: 0.875rem;
        line-height: 2.5rem;
        padding: var(--fay-gap);
        height: 250px;
      }
    }
  }
  &__description {
    margin-top: calc(var(--fay-gap) * 5);
    > .fect-col {
      height: 150px;
      .fect-link {
        display: block;
        height: inherit;
        width: 100%;
        color: initial;
      }
      .fect-card {
        height: inherit;
        color: var(--primary-foreground);
        h4 {
          font-weight: 600;
          margin: 0;
          font-size: 1.25rem;
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
        }
      }
    }

    .feature_icon {
      height: 2.5rem;
      width: 2.5rem;
      padding: 0.625rem;
      margin-right: var(--fay-gap-half);
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(#3291ff, #0761d1);
      color: #fff;
      border-radius: 2rem;
      svg {
        height: 100%;
        width: 100%;
      }
    }
  }
  @media only screen and (max-width: 650px) {
    &__home-page {
      top: 30px;
      width: 90vw;
      margin: 0 auto;
      .top {
        width: 100%;
      }
    }
    &__description {
      margin-top: var(--fay-gap);
      flex-direction: column;
      > .fect-col {
        height: 180px;
        width: 100% !important;
        margin: var(--fay-gap-half);
        &:last-child {
          margin-bottom: var(--fay-gap);
        }
      }
    }
  }
}
</style>
