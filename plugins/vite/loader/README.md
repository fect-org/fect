# loader Module

For performance. I had to give up use vite's `import.meta.glob` for route information registration.

Because when the project grow up. We will create a lot of markdown file to save us document. But we use vite's `import.meta.glob` as a initlize methods. It's will load all of markdown module. So far we had load 100+ module at first time. According to the network tab we can know that it takes
serveral sceonds to fully load.It greatly affects the user experience.

So `virtual-loader` will resolve this question.

Notice. I don't changing the original data struct.
