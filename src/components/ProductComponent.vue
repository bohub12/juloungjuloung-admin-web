<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h2>상품</h2>
  </div>
  <div
    id="product-item-header-section"
    class="container justify-content-between justify-content-between flex-wrap flex-md-nowrap"
  >
    <div class="row border product-item-header">
      <div class="col">상품이름</div>
      <div class="col">노출여부</div>
      <div class="col">상품 타입</div>
      <div class="col">상품 코드</div>
      <div class="col">가격</div>
      <div class="col">중량(mg)</div>
    </div>
  </div>

  <div class="container">
    <!-- 예시 상품 데이터 -->
    <div class="row border product-item">
      <div class="col">상품1</div>
      <div class="col">
        <span class="badge bg-danger product-activation-badge text-danger"
          ><i
            class="bi bi-exclamation-triangle-fill"
            style="padding-right: 0.25rem"
          ></i
          >미노출</span
        >
      </div>
      <div class="col">전자제품</div>
      <div class="col">P12345</div>
      <div class="col">₩1,000,000</div>
      <div class="col">500</div>
    </div>

    <div class="row border product-item">
      <div class="col">상품2</div>
      <div class="col">
        <span class="badge bg-success product-activation-badge text-success"
          ><i class="bi bi-check-circle-fill" style="padding-right: 0.25rem"></i
          >노출중</span
        >
      </div>
      <div class="col">의류</div>
      <div class="col">C98765</div>
      <div class="col">₩50,000</div>
      <div class="col">300</div>
    </div>

    <div class="row border product-item">
      <div class="col">상품3</div>
      <div class="col">숨김</div>
      <div class="col">도서</div>
      <div class="col">B45678</div>
      <div class="col">₩30,000</div>
      <div class="col">200</div>
    </div>
  </div>

  <nav aria-label="페이지 네비게이션">
    <ul class="pagination justify-content-center mt-4">
      <li class="page-item disabled">
        <a class="page-link" href="#" tabindex="-1" aria-disabled="true"
          >이전</a
        >
      </li>
      <li class="page-item active" aria-current="page">
        <a class="page-link" href="#"
          >1 <span class="visually-hidden">(현재)</span></a
        >
      </li>
      <li class="page-item">
        <a class="page-link" href="#">2</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">3</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">다음</a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProductComponent",
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.product-item-header {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-tertiary-bg-rgb), var(--bs-bg-opacity));
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.375rem;
}
#product-item-header-section {
  margin-right: 0rem;
  margin-left: 0rem;
}
.product-item {
  --bs-bg-opacity: 0.5;
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 0.375rem;
}
.product-activation-badge {
  --bs-bg-opacity: 0.3;
}
</style>
