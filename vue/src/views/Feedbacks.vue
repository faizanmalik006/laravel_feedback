<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-900">Feedbacks</h1>
        <router-link :to="{name: 'FeedbackCreate'}" class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 -mt-1 inline-block">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Submit new feedback
        </router-link>
      </div>
    </template>
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
      <div v-for="feedback in feedbacks" :key="feedback.id" class="flex flex-col col-span-3 py-4 px-6 shadow-md bg-white hover:bg-gray-50 ">
        <h4 class="mt-4 text-lg font-bold">{{ feedback.title }}</h4>
        <h5 class="mt-4 text-md "> <span class="font-bold">Category : </span>{{ feedback.category }}</h5>
        <h6 class="mt-4 text-sm font-bold">Description : </h6>
        <div v-html="feedback.description" class="mt-5 overflow-hidden flex-1"></div>
        <div class="flex justify-between items-center mt-3">
          <div class="flex items-center justify-center">
            <button v-if="feedback.id" type="button" @click="addVote(feedback)" class="h-8 w-8 rounded-full border border-transparent text-sm text-black-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
            <span>{{ feedback.votes }}</span>
          </div>
        </div>
      </div>
    </div>
  </PageComponent>
</template>


<script setup>
  import PageComponent from '../components/PageComponent.vue';
  import store from '../store';
  import { computed } from 'vue';

  const feedbacks = computed(()=> store.state.feedbacks);

  function addVote(feedback)
  {
    
  }
</script>