<template>
    <div class="col">
        <Header title="Project Title" tooltip="Please provide project title"/>
        <div class="form-group">
            <input class="form-control text-sm"
                type="text"
                :value="projectInput"
                @input="$emit('update:projectInput', $event.target.value)"
            >
        </div>
    </div>
    <!-- Requestor Name / Team || Briefing Description -->
    <!-- <div class="col" >
        <Header title="Requestor Name"/>
        <div class="form-group">
            <input class="form-control text-sm"
                type="text"
                :value="nameInput"
                @input="$emit('update:nameInput', $event.target.value)"
            >
        </div>
    </div>
    <div class="col">
        <Header title="Requestor Team"/>
        <div class="form-group">
            <input class="form-control text-sm"
                type="text"
                :value="teamInput"
                @input="$emit('update:teamInput', $event.target.value)"
            >
        </div>
    </div> -->
</template>

<script>
import Header from "./Header.vue";

export default {
    name: "InputFieldChild",
    props: {
        projectInput: {
            type: String,
            default: "",
            required: true
        },
        // nameInput: {
        //     type: String,
        //     default: "",
        //     required: true
        // },
        // teamInput: {
        //     type: String,
        //     default: "",
        //     required: true
        // },
    },
    components: {
        Header,
    },
}
</script>