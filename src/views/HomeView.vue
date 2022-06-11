<template>
  <div>
    <meetups-page :meetups="meetups">
      <template #filters = "{ filter, onFiltration }">
        <meetups-filter
          :filter="filter"
          :onFiltration="onFiltration"
        >
        </meetups-filter>
      </template>
      <template #view = "{ filteredMeetups }">
        <meetups-view
          :meetups="filteredMeetups"
        >
        </meetups-view>
      </template>
    </meetups-page>
  </div>
</template>

<script>

import MeetupsPage from '@/components/MeetupsPage.vue';

import MeetupsView from '@/components/MeetupsView.vue';
import MeetupsFilter from '@/components/MeetupsFilter.vue';

export default {
  name: 'HomeView',
  components: { MeetupsPage, MeetupsView, MeetupsFilter},
  data: () => ({
    meetups: [
      {
        name: 'meetup_one',
        text: 'text_1'
      },
      {
        name: 'meetup_two',
        text: 'text_2'
      },
      {
        name: 'meetup_three',
        text: 'text_3'
      },
      {
        name: 'meetup_four',
        text: 'text_4'
      }
    ]
  })
};
</script>
