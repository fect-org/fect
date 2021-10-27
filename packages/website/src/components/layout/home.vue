<template>
  <div class="fect-doc__home-page">
    <div class="top">
      <p>
        Fect is a Vue UI Library with beautifully handcrafted Vercel Component.No design skills required — everything
        you need to create amazing applications is at your fingertips
      </p>
    </div>

    <fe-row align="middle" justify="space-around" class="fect-doc__description">
      <fe-col :span="6">
        <fe-card shadow>
          <h4>
            <div class="feature_icon">
              <package />
            </div>
            Guide
          </h4>
          <p>View the design guidelines.</p></fe-card
        >
      </fe-col>
      <fe-col :span="6">
        <fe-card shadow>
          <h4>
            <div class="feature_icon">
              <feather />
            </div>
            Components
          </h4>
          <p>Ever-increasing list of concise and aesthetic components.</p>
        </fe-card>
      </fe-col>
      <fe-col :span="6">
        <fe-card shadow>
          <h4>
            <div class="feature_icon">
              <github />
            </div>
            Open Sourced
          </h4>
          <p>Fect is open sourced and available free under MIT licence.</p>
        </fe-card>
      </fe-col>
    </fe-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
})
</script>

<style lang="less" scoped>
.fect-doc {
  &__home-page {
    width: 100%;
    position: relative;
    top: calc((100vh - 64px) / 4);

    .top {
      width: 50%;
      margin: 0 auto;

      p {
        padding: 0;
        margin: 0;
        color: var(--accents-4);
        font-size: 1.18rem;
        line-height: 2.36rem;
      }
    }
  }
  &__description {
    margin-top: calc(var(--fay-gap) * 5);
    > .fect-col {
      height: 150px;
      .fect-card {
        height: inherit;
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
