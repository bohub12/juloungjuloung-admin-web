# juloungjuloung-admin-web

## Tech Stack

- Typescript
- Vue 3 (vue, vue router)
- Vuex
- bootstrap, bootstrap-icon

## Project Structure

```
src
├── App.vue
├── assets
├── apis
├── components
│   ├── HeaderComponent.vue
│   ├── SidebarComponent.vue
│   ├── DashboardComponent.vue
│   ├── ThemeSwitchComponent.vue
│   └── etc
├── main.ts
├── router
│   └── index.ts
├── store
│   ├── index.ts
│   ├── theme.ts
│   └── etc
└── views
    └── MainView.vue
    └── etc
```

## Build & Run Script

- build : `npm run build`
- run : `npm run serve`
- lint check : `npm run lint`

## OpenAPI Generator CLI Script

- `package.json` like below and run the script below

```json
/* package.json */
{
  "scripts": {
    "oas-generate": "openapi-generator-cli generate -i http://localhost:8081/v3/api-docs -g javascript -o ./src/apis"
  }
}

/* script 실행 */
$ npm run oas-generate
```

## Reference

- [Vue 3 - Official Documentation](https://vuejs.org/guide/introduction.html#introduction)
- [Vuex - Official Documentation](https://vuex.vuejs.org/)
- [openapi-generator]()
- [Bootstrap - Official Documentation](https://getbootstrap.kr/docs/5.3/getting-started/introduction/)
- [Bootstrap Examples](https://getbootstrap.kr/docs/5.3/examples/)
