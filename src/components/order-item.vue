<template>
  <div class="order-item-wrapper">
    <img class="order-item-img" :src=" require('../assets/images/'+product_data.photoUrl)" alt="img">
    <div class="order-item-description">
        <select v-show="UpdateSubmit" class="order-add select-add"
                v-model="ProductName.name" required
        v-on:change="updateOrder(order_data)">
          <option v-for="product in PRODUCTS"
                   :key="product.id">
            {{product.name}}
          </option>
        </select>
      <h2 v-show="!UpdateSubmit">{{product_data.name}}</h2>
      <p>Цена:{{product_data.price}}$</p>
      <p>Количество:
        <span v-show="!UpdateSubmit">{{order_data.count}}</span>
        <input v-model="order_data.count" class="input-edit-order" type="text"  required
               v-show="UpdateSubmit">шт.</p>
      <p> Сума:{{order_data.count*product_data.price}}$</p>
    </div>

    <div class="btn-item">
      <v-btn type="button" class="btn btn-change btn-card"
             v-show="!UpdateSubmit"
             v-on:click="editOrder()">Изменить</v-btn>
      <div v-show="UpdateSubmit" class="btn-item-edit">
        <v-btn class="btn btn-card btn-save"
               v-on:click="updateOrder(order_data)">Сохранить</v-btn>
        <v-btn class="btn btn-card"
               v-on:click="cancelEdit()">Отмена</v-btn>
      </div>
      <v-btn type="button" class=" btn btn-delete btn-card"
             v-on:click="deleteOrder(order_data)">Удалить</v-btn>
    </div>

    <div v-for="status in STATUS"
         :key="status.id">
      <div class="order-status" v-if="status.id===order_data.statusId">
        <h3 style="float: right">Статус: {{status.name}}</h3>
        <div v-if="status.id===0">
          <v-btn class="btn order-item-status"
                 v-show="!UpdateSubmit" type="button"
                 v-on:click="confirmOrder(order_data)">Подтвердить</v-btn>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import {mapActions, mapGetters} from "vuex";
import axios from "axios";

export default {
  name: "order-item",
  components: {
  },
  props:{
    product_data:{
      type:Object,
      default(){
        return{}
      }
    },
    order_data:{
      type:Object,
      default(){
        return{
        }
      }
    }
  },
  data(){
    return{
      UpdateSubmit:false,
      ProductName:{
        name:this.order_data.name
      }
    }
  },
  computed:{
    ...mapGetters(['STATUS']),
    ...mapGetters(['ORDER']),
    ...mapGetters(['PRODUCTS']),
  },
  methods:{
    ...mapActions([
      'GET_STATUS_API',
    ]),
    ...mapActions([
      'GET_ORDER_API'
    ]),
    ...mapActions([
      'GET_PRODUCTS_API',
    ]),
    editOrder(){
      this.ProductName.name=this.order_data.name;
      this.GET_ORDER_API();
      this.UpdateSubmit=true;
    },
    cancelEdit(){
      this.GET_ORDER_API();
      this.UpdateSubmit=false;
    },
    updateOrder(order_data){
      axios.put('http://localhost:3000/order/'+ order_data.id,{
        statusId:this.order_data.statusId,
        name: this.ProductName.name,
        count: this.order_data.count
      })
          .then(() => {
            this.GET_ORDER_API();
            this.UpdateSubmit=false;
            alert('Update...')
          })
          .catch(() => {
            alert('error update')
          })
    },
    confirmOrder(order_data){
      if (window.confirm("Подтвердить заказ?")) {
        axios.put('http://localhost:3000/order/'+ order_data.id,{
          statusId:1,
          name: this.order_data.name,
          count: this.order_data.count
        })
            .then(() => {
              this.GET_ORDER_API();
              alert("Заказ подтвержден");
            })
            .catch(() => {
              alert('error confirm')
            })


      }
    },

    deleteOrder(order_data) {
      if (window.confirm("Удалить заказ?")) {
        axios.delete('http://localhost:3000/order/'+order_data.id)
            .then(() => {
              this.GET_ORDER_API();
              alert('delete...')
            })
            .catch(() => {
              alert('error delete')
            })
      }
    }
  },
  mounted() {
    this.GET_STATUS_API();
    this.GET_ORDER_API();
    this.GET_PRODUCTS_API();
  }
}
</script>

<style scoped>
.order-item-wrapper{
  display: flex;
  margin: 20px;
  border: 1px solid black;
}
.btn{
  border: 1px solid black;
  background: #C4C4C4;
}
.order-item-description{
  display: flex;
  margin: 0 80px 0 20px ;
  flex-direction: column;
  justify-content: center;
}
.order-item-img{
  width: 250px;
  height: 200px;
}
.btn-card{
  width: 150px;
  padding: 10px;
  margin-top: 20px;
}
.order-item-status{
  position: absolute;
  width: 150px;
  float: right;
  padding: 10px;
  margin-top: 95px;
}
.btn-item{
  display: flex;
  flex-direction: column;
  margin: 20px;
}
.btn-item-edit{
  display: flex;
}
.btn-save{
  margin-right: 10px;
}
.input-edit-order{
  border:2px solid black;
  width: 30px;
}
.order-add{
  border:2px solid black;
}
</style>