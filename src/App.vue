<template>
    <nav>



      <div class="container-fluid">
        <div class="row">
          <div class="col-md-3">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Check Bootstrap
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div>
          <div class="col-md-3">2</div>
          <div class="col-md-3">3</div>
        </div>
      </div>




        <div><router-link to="/">Главная</router-link></div>
        <div><router-link to="/login">Вход/регистрация</router-link></div>
    </nav>
    <router-view></router-view>
    <footer>
        <div>Some footer</div>
    </footer>
</template>

<style></style>
