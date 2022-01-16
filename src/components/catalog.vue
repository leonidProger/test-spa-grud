<template>
  <div class="Catalog">
    <h1>Список заказов:</h1>
    <div
        v-for="order in ORDER"
        :key="order.productId">
      <div v-for="products in PRODUCTS"
            :key="products.id">
        <div v-if="(order.name===products.name)||(order.productId===products.id)">
          <orderItem
              :product_data="products"
              :order_data="order"
          />
        </div>
      </div>
    </div>


    <v-dialog v-model="dialog"   width="250">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="btn-add-dialog"
            v-bind="attrs"
            v-on="on">
          Добавить заказ
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Добавить заказ:
        </v-card-title>
        <v-card-text>

          <form @submit.prevent="save">
            <label>Выберете товар:</label><br>
            <select class="order-add select-add" v-model="form.name" required >
              <option  v-for="products in PRODUCTS"
                       :key="products.id">
                {{products.name}}
              </option>
            </select><br>
            <label>Введите  количество:</label><br>
            <input class="order-add" type="text" v-model.number="form.count" required><br>
            <v-btn class="addToOrder" type="submit" name="button">Добавить заказ</v-btn>
          </form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import orderItem from "@/components/order-item";
import {mapActions,mapGetters} from 'vuex';
import axios from "axios";
export default {
  name: "catalog",
  components:{
    orderItem
  },
  data:()=>{
    return{
      form:{
        statusId:0,
      },
      dialog:false
    }
  },
  computed:{
    ...mapGetters(['ORDER']),
    ...mapGetters(['PRODUCTS']),
  },
  methods:{
    ...mapActions([
      'GET_ORDER_API'
    ]),
    ...mapActions([
      'GET_PRODUCTS_API'
    ]),
    save(){
    axios.post('http://localhost:3000/order',this.form)
        .then(()=>{
          this.GET_ORDER_API();
          this.form.count=''
          this.dialog=false
          alert('saving...')
      })
        .catch(()=>{
          alert('error saving')
        })
    }
  },
  mounted() {
    this.GET_ORDER_API();
    this.GET_PRODUCTS_API();
  }
}
</script>

<style scoped>
.Catalog{
  background: aliceblue;
}
.addToOrder{
  border: 1px solid black;
  background: #C4C4C4;
  padding: 10px;
  margin: 20px;
}
.order-add{
  border:2px solid black;
  margin:10px;
}
.select-add{
  width: 160px;
}
.btn-add-dialog{
  float:right;
  margin: 20px;
}
</style>