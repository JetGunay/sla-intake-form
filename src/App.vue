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
            <select-field 
              v-model="selected" 
              :options="brands" 
              label="Select Brands" 
              placeholder="Select Brands" 
              value="title" 
              required 
              @customCheck="selectbrands"/>
          </div>
        </div>
        <!-- Project Title || Project Task Title -->
        <div class="container w-75">
          <!-- <InputFieldChild 
            v-model:projectInput="projectInput"
          /> -->
          <Header title="Project Title" tooltip="Please provide project title"/>
          <input-field :value="projectInput" v-model:modelInput="projectInput" required />
          <!-- v-model:nameInput="nameInput" 
          v-model:teamInput="teamInput"  -->
        </div>
        <!-- Requestor -->
        <div class="container w-75">
          <Header title="Requestor Team" tooltip="" />
          <select-field 
            v-model="selected" 
            :options="sortedGrps" 
            label="Select Group" 
            placeholder="Select Group" 
            value="id" 
            required 
            @customCheck="onChangeGrp"/>
        </div>
        <div class="container w-75">
          <Header title="Requestor Name" tooltip="" />
          <select class="form-select form-select-sm" @change="onChangeUser">
            <option :value="null" selected disabled>Select User</option>
            <option 
              v-for="user in sortedUsers" 
              :key="user.id" 
              :value="`${user.id}`"
            >
              {{ user.firstName }} {{ user.lastName }}
            </option>
          </select>
        </div>
        
        <div class="container w-75">
          <!-- Briefing Description -->
          <div class="col">
            <Header title="Request / Campaign / Promotion Overview" 
              tooltip="Please give us as much detail as possible to help inform out creative response. If it's a promotions, new or recurring, please add the mechanics here"/>
            <radio-field v-for="campaign in campaigns" 
            :label="campaign.name" :fieldId="campaign.name"
            :key="campaign"
            :name="`cm${campaigns.length}`"
            :value="campaign.name"
            @radioCheck="selectCampaign"/>
          </div>
          <div class="col">
            <Header title="Who are we talking to?"/>
            <radio-field v-for="player in players"
            :label="player.name" :fieldId="player.name" 
            :key="player"
            :name="`pl${players.length}`"
            :checked="isChecked"
            :value="player.name"
            @radioCheck="selectPlayers"
            />
            <div class="form-group">
              <input class="form-check-input" type="radio" id="player" 
                :name="`pl${players.length}`" value="Others" v-model="checked" >
              <label class="form-check-label mx-2" for="player">Others</label>
              <input type="text" class="form-control-sm" value="" id="others" 
                v-if="checked" placeholder="Please specify customers">
            </div>
          </div>
          <div class="col">
            <Header title="What are our key messages?" />
            <!-- <input-field @customCheck="check" required/> -->
            <input-field :value="keyInput" v-model:modelInput="keyInput" required />
          </div>
        </div>
        <div class="container w-75">
          <div class="col">
            <text-field :value="cdsEditor" v-model:textChange="cdsEditor" label="Which Consume (Delta) Segment are you targeting?" required/>
          </div>
          <div class="col">
            <text-field :value="stateEditor" v-model:textChange="stateEditor" label="What 'need state' or Insight is this request delivering against?" required/>
          </div>
        </div>
        
          <!-- Parent Task  -->
        <div class="container w-75">
          <div class="col">
            <Header title="Task Requirement"/>
            <checkbox-field :fieldId="task.name" 
              :label="task.name" v-for="task in tasks"
              :checked="isChecked"
              :key="task"
              :value="task.id"
              :model="task.checkedTasks"
              @update:checkedTasks="updatecheckedTasks"
            />
            <div v-for="s in selectedTask" :key="s.index">
              <text-field-modal  
              :label="`${s.name} Requirements`" 
              :id="s.id" 
              :value="`Editor${s.id}`"
              v-model:descInput="descInput"
              v-model:Editor1="Editor1"
              v-model:Editor2="Editor2"
              v-model:Editor3="Editor3"
              v-model:Editor4="Editor4"
              :assetsId="assets.filter((id) => id.id === s.id)"
              :assets="assets.filter((id) => id.id === s.id).map((content) => content.content).flat()"
              @customCheck="selectassets($event, s.id)"
            />
            </div>
          </div>
        </div>
        
        <!-- Briefing Description -->
        <div class="container w-75">
          <div class="col">
            <Header title="Campaign Planned Date Date"/>
            <date-field @checkDate="plannedDate" :calcDate="calcDate" />
          </div>
          <!-- Finish Date -->
          <div class="col">
            <Header title="Desired Delivery Date"/>
            <!-- <date-field v-model="datepicker" @checkDate="deliveryDate" :calcDate="calcDate" /> -->
            <DatePicker
              v-model="calcDate"
              :disabledWeekDays="[6, 0]"
              :readonly="false"
              :format="format"
              disabled
            />
          </div>
          <!-- {{this.selectedTask}} -->
        </div>
      </div>
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
import TextFieldModal from "./components/TextFieldModal.vue";
import RadioField from "./components/RadioField.vue"
import InputFieldChild from "./components/InputFieldChild.vue";
import ModalContent from "./components/ModalContent.vue";

import { ref } from "vue";
import moment from "moment";
import { mixin } from "./mixin";
// import { HTTP } from "./http";
import DatePicker from "@vuepic/vue-datepicker";

export default {
  name: "App",
  data(){
    return {
      brands: [],
      tasks: [],
      players: [],
      priority: [],
      campaigns: [],
      assets: [],
      selected: "",
      checked: false,
      datepicker: "",
      checkTasks: [],
      deliverydate: "",
      checkedTasks: [],
      groups: [],
      users: [],
      userId: "",
      grpName: "",
    }
  },
  setup() {
    const isChecked = ref(false);

    const projectInput = ref("");
    const descInput = ref("");
    const keyInput = ref("");
    const cdsEditor = ref("");
    const stateEditor = ref("");
    const Editor1 = ref("");
    const Editor2 = ref("");
    const Editor3 = ref("");
    const Editor4 = ref("");
    // const nameInput = ref("");
    // const teamInput = ref("");

    const customdate = ref(new Date());

    const format = (customdate) => {
      const date = moment(customdate).format("ddd, MMMM Do YYYY");
      return date;
    };

    return {
      isChecked,
      projectInput,
      descInput,
      keyInput,
      cdsEditor,
      stateEditor,
      Editor1,
      Editor2,
      Editor3,
      Editor4,
      // nameInput,
      // teamInput,
      customdate,
      format,
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
    TextFieldModal,
    RadioField,
    InputFieldChild,
    ModalContent,
    DatePicker,
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
        this.campaigns = r.campaigns;
        this.assets = r.assets;
        this.groups = r.groups;

        console.log(this.groups);
      });

      // HTTP.get("/groups").then((r) => {
      //   this.groups = r.data.data.filter((memberIds) => memberIds.memberIds.length != 0);
      // });
  },
  computed: {
    inputTitle() {
      return this.descInput;
    },
    selectedTask() {
      return this.tasks.filter((id) => this.checkTasks.indexOf(id.id) > - 1);
    },
    selectedTaskComms() {
      return this.scomms.filter((id) => this.checkTasks.indexOf(id.id) > - 1);
    },
    totaldays() {
      var days = this.selectedTask.map((d) => d.days);
      return days.reduce((a,b) => a + b, 0);
    },
    calcDate() {
      var today = new Date();
      var enddate = "";
      // var days = 14;
      var days = this.selectedTask.map((d) => d.days);
      var total = days.reduce((a,b) => a + b, 0);
      var count = 0;
      if (days == 0) {
        return enddate = today
      }
      while(count < total) {
        enddate = new Date(today.setDate(today.getDate() + 1));
        if (enddate.getDay() != 0 && enddate.getDay() != 6) {
          count++;
        }
      }
      return enddate
    },
    sortedGrps() {
      return [...this.groups].sort((a, b) => a.title.localeCompare(b.title));
    },
    sortedUsers() {
      return [...this.users].sort((a, b) => a.firstName.localeCompare(b.firstName));
    },
  },
  methods: {
    check(e){
      console.log(e)
    },
    textFieldVal(e) {
      e.target.value == 1 ? this.show : !this.show;
    },
    getTaskId(id) {
      return this.tasks.findIndex(x => x.id === id);
    },
    plannedDate(date) {
      this.planneddate = moment(date).format("YYYY-MM-DD");
      console.log("plan " + this.planneddate);
      console.log("calc " + this.calcDate)
    },
    deliveryDate(date) {
      this.deliverydate = moment(date).format("YYYY-MM-DD");
      console.log(this.deliverydate);
    },
    selectbrands(e) {
      this.selectedBrand = e;
      console.log(this.selectedBrand)
    },
    onChangeGrp(e) {
      this.grpId = e;

      mixin.getGroupMembers(this.grpId).then((r) => {
        this.grpName = r.map((t) => t.title).toString();
        var userIds = r.map((id) => id.memberIds);
        const UserArr = [];
        for (let u = 0; u < userIds.length; u++) {
          UserArr.push(
            mixin.getUsers(userIds[u]).then((r) => new Promise((res) => res(r)))
          );
        }
        Promise.all(UserArr).then((r) => {
          this.users = r.flat();
        })
      })
    },
    onChangeUser(e) {
      this.userId = e.target.value;
      mixin.getUsers(this.userId).then((r) => {
        this.firstName = r.map((f) => f.firstName);
        this.lastName = r.map((l) => l.lastName);
        this.userEmail = r.map((p) => p.profiles).map(e => {return {email: e[0].email}});
        console.log(this.userEmail[0].email)
      })
    },
    selectCampaign(e) {
      this.campaign = e;
      console.log("camp " + this.campaign)
    },
    selectPlayers(e) {
      this.player = e;
      console.log("player " + this.player)
    },
    updatecheckedTasks(id) {
      if(this.checkTasks.includes(id)) {
        const index = this.checkTasks.indexOf(id);
        this.checkTasks.splice(index, 1);
      } else {
        this.checkTasks.push(id);
      }
      console.log(this.checkTasks);
      console.log(this.selectedTask.filter((i) => i.id === 1))
    },
    selectassets(e, id) {
      // var assetArr = [];
      // this.checkTasks.push({id: 0, assets: e})
      this.selectedAssets = e;
      console.log(this.checkTasks.concat({id: id, req: this.CopyEditor}))
    },
    addProject() {
      //project
      var brandName = this.brands.filter((id) => id.id === this.selectedBrand).map((t) => t.title);
      var separator = `<div>----------------------------------------------------------------------------------------------------------------------</div>`;
      var projectBasics = `
        <h5>Please leave your contact information</h5>
          <strong>Name</strong>
            <div>${this.firstName} ${this.lastName}</div><br>
          <strong>Email</strong><br>
            <div>${this.userEmail[0].email}</div>
        <h3>The basics</h3>
          <strong>Brand</strong>
            <div>${brandName}</div><br>
      `;
      var projectFooter = `
        ${separator}
        <div><strong>Request / Campaign / Promotion Overview</strong></div>
          <div>${this.campaign}</div><br>
        <div><strong>Who are we talking to?</strong></div>
          <div>${this.player}</div><br>
        <div><strong>What are our key messages?</strong></div>
          <div>${this.keyInput}</div><br>
        <div><strong>Which Consume (Delta) Segment are you targeting?</strong></div>
          <div>${this.cdsEditor}</div><br>
        <div><strong>What 'need state' or Insight is this request delivering against?</strong></div>
          <div>${this.stateEditor}</div><br>
        <div><strong>Campaign Planned Start Date/Live Date</strong></div>
          <div>${this.planneddate}</div>
        <h3>Extra Details</h3>
          <strong>Team</strong>
            <div>${this.grpName}</div><br>
      `;

      if (this.selectedTask.filter((i) => i.id === 1).length > 0) {
        this.projTaskDesc1 = `
          ${separator}
          <div><strong>Copy Requirements</strong></div>
          ${this.Editor1}
        `;
        console.log(this.projTaskDesc1)
      } 
      if (this.selectedTask.filter((i) => i.id === 2).length > 0) {
        this.projTaskDesc2 = `
          ${separator}
          <div><strong>Design Requirements</strong></div>
          ${this.Editor2}
        `;
        console.log(this.projTaskDesc2)
      } 
      if (this.selectedTask.filter((i) => i.id === 3).length > 0) {
        this.projTaskDesc3 = `
          ${separator}
          <div><strong>Motion Requirements</strong></div>
          ${this.Editor3}
        `;
        console.log(this.projTaskDesc3)
      } 
      if (this.selectedTask.filter((i) => i.id === 4).length > 0) {
        this.projTaskDesc4 = `
          ${separator}
          <div><strong>Developer Requirements</strong></div>
          ${this.Editor4}
        `;
        console.log(this.projTaskDesc4)
      }

      var projectDescTemplate = projectBasics + this.projTaskDesc1 + this.projTaskDesc2 + this.projTaskDesc3 + this.projTaskDesc4 + projectFooter;
      var data = {
        title: this.projectInput,
        project: {
          ownerIds: [this.userId],
          endDate: moment(this.calcDate).format("YYYY-MM-DD"),
        },
      };
      mixin.addFolder(this.selectedBrand, data).then((r) => {
        var projectId = r.map((id) => id.id);
        var selectedTaskId = this.selectedTask.map((id) => id.id);

        var updateData = { description: `<p>${projectDescTemplate}</p>`, };
        mixin.updateProject(projectId, updateData).then((r) => console.log(r));
        
        for (let s = 0; s < selectedTaskId.length; s++) {
          var ticketName = this.selectedTask.map((name) => name.name);
          var ticketId = this.selectedTask.map((i) => i.id);

          if (ticketId[s] === 1) {
            this.taskDesc = this.Editor1;
            console.log(this.taskDesc)
          } else if (ticketId[s] === 2) {
            this.taskDesc = this.Editor2;
            console.log(this.taskDesc)
          } else if (ticketId[s] === 3) {
            this.taskDesc = this.Editor3;
            console.log(this.taskDesc)
          } else if (ticketId[s] === 4) {
            this.taskDesc = this.Editor4;
            console.log(this.taskDesc)
          }
          //tasks
          var taskData = {
            title: ticketName[s],
            description: `<p>${ticketName[s]} <br> ${this.taskDesc}</p>`,
          };
          // console.log(this.inputTitle[s])
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
          responsibles: [this.userId],
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
