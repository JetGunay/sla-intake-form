<template> 
<div>
  <div class="container w-75">
    <img src="../src/assets/wrike-logo-2.png" class="img-fluid" alt="wrike_logo" id="wrike-logo">
    <h1 class="text-center fw-bold my-4">Briefing Form</h1>
  </div>
  

    <!-- Project Container -->
    <form class="container-fluid" method='post' @submit.prevent="addProject"> <!--Form to Submit -->
      <div class="container-fluid">
        <div class="container w-75">
          <div class="col">
            <!-- Brands -->
            <Header title="Brands" tooltip="Choose on different brands" />
            <select-field v-model="selected" :options="brands" label="Select Brands" placeholder="Select Brands" value="name" required @customCheck="selectbrands"/>
          </div>
        </div>
        <!-- Project Title || Project Task Title -->
        <div class="container w-75">
          <InputFieldChild 
            v-model:projectInput="projectInput" 
            v-model:nameInput="nameInput" 
            v-model:teamInput="teamInput" 
          />
        </div>
        
        <div class="container w-75">
          <!-- Briefing Description -->
          <div class="col">
            <Header title="Request / Campaign / Promotion Overview" tooltip="Please give us as much detail as possible to help inform out creative response. If it's a promotions, new or recurring, please add the mechanics here"/>
            <radio-field :fieldId="campaign.name" 
            :label="campaign.name" v-for="campaign in campaign" 
            :key="campaign"
            :name="campaign"
            :value="campaign.name"
            @radioCheck="check"/>
          </div>
          <div class="col">
            <Header title="Who are we talking to?"/>
            <radio-field :fieldId="player.name" 
            :label="player.name" v-for="player in players" 
            :key="player"
            :name="players"
            :checked="isChecked"
            :value="player.name"
            @radioCheck="selectPlayers"
            />
            <div class="form-group">
              <input class="form-check-input" type="radio" id="player" :name="players" value="Others" v-model="checked" >
              <label class="form-check-label mx-2" for="player">Others</label>
              <input type="text" class="form-control-sm" value="" id="others" v-if="checked"  placeholder="Please specify customers">
            </div>
          </div>
          <div class="col">
            <Header title="What are our key messages?" />
            <input-field @customCheck="check" required/>
          </div>
        </div>
        <div class="container w-75">
          <div class="col">
            <text-field label="Which Consume (Delta) Segment are you targeting?" required/>
          </div>
          <div class="col">
            <text-field label="What 'need state' or Insight is this request delivering against?" required/>
          </div>
        </div>
        
          <!-- Parent Task  -->
        <div class="container w-75">
          <div class="col">
            <Header title="Task Requirement"/>
            <checkbox-field :fieldId="task.name" 
            :label="task.name" v-for="task in tasks" 
            :key="task" 
            :checked="isChecked"
            :value="task.id"
            v-model="task.checkedTasks"
            @update:checkedTasks="updatecheckedTasks"
            />
          </div>
        </div> 
        <!-- Modal Form -->
        <!-- <modal-content label="Copy Requirements" id="copy" :options="assets"/>
        <modal-content label="Design Requirements" id="design" />
        <modal-content label="Motion Requirements" id="motion" />
        <modal-content label="Developer Requirements" id="dev" /> -->
        
        <!-- Briefing Description -->
        <div class="container w-75">
          <div class="col">
            <Header title="Campaign Planned Date Date"/>
            <date-field @checkDate="plannedDate" />
          </div>
          <!-- Finish Date -->
          <div class="col">
            <Header title="Desired Delivery Date"/>
            <date-field v-model="datepicker" @checkDate="deliveryDate" />
          </div>
        </div>
      </div>  
      <select @change="onChangeGrp">
        <option :value="null" selected disabled>Select Group</option>
        <option v-for="group in groups" :key="group.id" :value="`${group.id}`">{{ group.title }}</option>
      </select>
      <select>
        <option :value="null" selected disabled>Select User</option>
        <option v-for="user in users" :key="user.id" :value="`${user.id}`">{{ user.firstName }} {{ user.lastName }}</option>
      </select>
      <div class="d-flex justify-content-center mt-4">
        <Button class="btn btn-danger" text="Reset"/>
        <Button class="btn btn-success" text="Submit"/>
      </div> 
    </form>
</div>
</template>

<script>
import Header from "./components/Header.vue";
import InputField from "./components/InputField.vue";
import CheckboxField from "./components/CheckboxField.vue";
import DateField from "./components/DateField.vue";
import Button from "./components/Button.vue";
import SelectField from "./components/SelectField.vue";
import TextField from "./components/TextField.vue";
import RadioField from "./components/RadioField.vue"
import InputFieldChild from "./components/InputFieldChild.vue";
// import ModalContent from "./components/ModalContent.vue";

import { ref } from "vue";
import moment from "moment";
import { mixin } from "./mixin";
import { HTTP } from "./http";

export default {
  name: "App",
  data(){
    return {
      brands: [],
      tasks: [],
      players: [],
      priority: [],
      campaign: [],
      assets: [],
      selected: "",
      checked: false,
      datepicker: "",
      checkTasks: [],
      deliverydate: "",
      checkedTasks: [],
      groups: [],
      users: [],
    }
  },
  setup() {
    const isChecked = ref(false);

    const projectInput = ref("");
    const nameInput = ref("");
    const teamInput = ref("");

    return {
      isChecked,
      projectInput,
      nameInput,
      teamInput,
    };
  },
  components: {
    Header,
    InputField,
    CheckboxField,
    DateField,
    Button,
    SelectField,
    TextField,
    RadioField,
    InputFieldChild,
    // ModalContent,
},
  created() {
    fetch("./data.json")
      .then((r) => r.json())
      .then((r) => {
        this.brands = r.brands;
        this.tasks = r.tasks;
        this.scomms = r.scomms;
        this.players = r.players;
        this.priority = r.priority;
        this.campaign = r.campaign;
        this.assets = r.assets;

        console.log(this.assets.map((content) => content.content));
      });

      HTTP.get("/groups").then((r) => {
        this.groups = r.data.data;
        console.log(this.groups.filter((memberIds) => memberIds.memberIds.length != 0));
      });
  },
  computed: {
    inputTitle() {
      return this.project;
    },
    selectedTask() {
      return this.tasks.filter((id) => this.checkTasks.indexOf(id.id) > - 1);
    },
    selectedTaskComms() {
      return this.scomms.filter((id) => this.checkTasks.indexOf(id.id) > - 1);
    }
  },
  methods: {
    check(e){
      console.log(e)
    },
    textFieldVal(e) {
      e.target.value == 1 ? this.show : !this.show;
    },
    plannedDate(date) {
      this.planneddate = moment(date).format("YYYY-MM-DD");
      console.log(this.planneddate);
    },
    deliveryDate(date) {
      this.deliverydate = moment(date).format("YYYY-MM-DD");
      console.log(this.deliverydate);
    },
    selectbrands(e) {
      this.selectedBrand = e;
      console.log(this.selectedBrand)
    },
    selectPlayers(e) {
      this.selectedPlayers = e;
    },
    onChangeGrp(e) {
      this.grpId = e.target.value;
      console.log(this.grpId);

      mixin.getGroupMembers(this.grpId).then((r) => {
        var userIds = r.map((id) => id.memberIds);
        const UserArr = [];
        for (let u = 0; u < userIds.length; u++) {
          UserArr.push(
            mixin.getUsers(userIds[u]).then((r) => new Promise((res) => res(r)))
          );
        }
        Promise.all(UserArr).then((r) => {
          this.users = r.flat();
          console.log(this.users);
        })
      })
    },
    updatecheckedTasks(id) {
      if(this.checkTasks.includes(id)) {
        const index = this.checkTasks.indexOf(id);
        this.checkTasks.splice(index, 1);
      } else {
        this.checkTasks.push(id);
      }
      console.log(this.checkTasks);
    },
    addProject() {
      //project
      var brandName = this.brands.filter((id) => id.id === this.selectedBrand).map((name) => name.name);
      var separator = `<div>----------------------------------------------------------------------------------------------------------------------</div>`;
      var projectBasics = `
        <h5>Please leave your contact information</h5>
          <strong>Name</strong>
            <div>${this.nameInput}</div>
        <h3>The basics</h3>
          <strong>Brand</strong>
            <div>${brandName}</div>
      `;
      var projectFooter = `
        ${separator}
        <div><strong>Who are we talking to?</strong></div>
          <div>${this.selectedPlayers}</div>
        <div><strong>Campaign Planned Start Date/Live Date</strong></div
          <div>${this.planneddate}</div>
        <h3>Extra Details</h3>
          <strong>Team</strong>
            <div>${this.teamInput}</div>
      `;
      var projectDescTemplate = projectBasics + projectFooter;
      var data = {
        title: this.projectInput,
        project: {
          ownerIds: ["KUAJEY6U"],
          endDate: this.deliverydate,
        },
      };
      mixin.addFolder(this.selectedBrand, data).then((r) => {
        var projectId = r.map((id) => id.id);
        var selectedTaskId = this.selectedTask.map((id) => id.id);

        var updateData = { description: `<p>${projectDescTemplate}</p>`, };
        mixin.updateProject(projectId, updateData).then((r) => console.log(r));
        
        for (let s = 0; s < selectedTaskId.length; s++) {
          var ticketName = this.selectedTask.map((name) => name.name);
          //tasks
          var taskData = {
            title: ticketName[s],
            description: `<p>${selectedTaskId.map((name) => name.name)}</p>`,
          };
          mixin.addTaskToProject(projectId, taskData).then((r) => {
            var taskIds = r.map((id) => id.id);
            var subTask = this.selectedTask.map((subtasks) => subtasks.subtasks);
            for (let st = 0; st < subTask[s].length; st++) {
              //subtasks
              var subtaskData = {
                title: subTask[s][st],
                superTasks: [taskIds],
              };
              mixin.addTaskToProject(projectId, subtaskData).then((r) => console.log(r));
            }
          })
        }
        //stakeholder comms
        var scommsData = {
          title: "Stakeholder Comms",
          description: `<p>${projectDescTemplate}</p>`,
          parents: [projectId],
        };
        mixin.addTaskToProject(projectId, scommsData).then((r) => {
          var commsId = r.map((id) => id.id);
          var commsTask = this.selectedTaskComms.map((name) => name.name);
          for (let c = 0; c < commsTask.length; c++) {
            for (let cc = 0; cc < commsTask[c].length; cc++) {
              var commsData = {
              title: commsTask[c][cc],
              description: ``,
              superTasks: [commsId],
            };
            mixin.addTaskToProject(projectId, commsData).then((r) => console.log(r));
            }
          }
        });
      });
      console.log(this.tasks.filter((id) => id.checkedTasks));
    },
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Pacifico&family=Poppins:ital,wght@0,400;1,700&display=swap");
#app {
  font-family: $font;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  box-sizing: border-box;
}

</style>
