<template>
    <div class="form-group mt-2">
        <label class="form-label fw-bold">{{label}}</label>
        <QuillEditor :id="this.value" :ref="this.value" @editorChange="$emit('update:'+this.value , this.$refs[this.value].getHTML())" />
        <!-- <div v-for="s in assetsId" :key="s.id">
        {{s.id}}
            <QuillEditor :id="s.id" :ref="this.value" @update:content="$emit('update:Editor'+ s.id , this.$refs[this.value].getHTML())" />
        </div> -->
        <!-- {{this.assetsId}} -->
        <label class="form-label fw-bold">Task Assets</label>
        <div></div>
        <select class="form-select form-select-sm" @change="onChange">
            <option :value="null" selected disabled>Select Asset</option>
            <option v-for="a in assets" :key="a.id" :value="`${a.id}`">{{ a.name }}</option>
        </select>
        <ul>
            <li v-for="t in taskAsset" :key="t.id">
                <label>{{t.name}} {{t.value}}</label>
            </li>
        </ul>
        {{this.assets}}

        <!-- <div v-if="this.id === 1">
            <QuillEditor id="CopyEditor" ref="CopyEditor" @textChange="$emit('update:CopyEditor' , this.$refs.CopyEditor.getHTML())" />
            <select class="form-select form-select-sm" @change="onChange">
                <option :value="null" selected disabled>Select Asset</option>
                <option v-for="a in assetsId.map((content) => content.content).flat()" :key="a.id" :value="`${a.id}`">{{ a.name }}</option>
            </select>
            <ul>
                <li v-for="t in taskAsset" :key="t.id">
                    <label>{{t.name}} {{t.value}}</label>
                </li>
            </ul>
        </div>
        <div v-if="this.id === 2">
            <QuillEditor id="DesignEditor" ref="DesignEditor" @textChange="$emit('update:DesignEditor' , this.$refs.DesignEditor.getHTML())" />
            <select class="form-select form-select-sm" @change="onChange">
                <option :value="null" selected disabled>Select Asset</option>
                <option v-for="a in assetsId.map((content) => content.content).flat()" :key="a.id" :value="`${a.id}`">{{ a.name }}</option>
            </select>
            <ul>
                <li v-for="t in taskAsset" :key="t.id">
                    <label>{{t.name}} {{t.value}}</label>
                </li>
            </ul>
        </div> -->
        <textarea class="form-control" @input="$emit('update:descInput', $event.target.value)"></textarea>
    </div>
</template>
<script>
export default {
    name: 'TextField',
    data() {
        return {
            taskAsset: [],
        }
    },
    props: {
        label: String,
        assets: Object,
        value: String,
        id: Number,
        assetsId: Object,
    },
    computed: {},
    methods: {
        onChange(e) {
            this.a = e.target.value;
            this.taskAsset = this.assets.filter((id) => this.a.indexOf(id.id) > - 1).map((a) => a.asset).flat();
            this.$emit("customCheck", this.taskAsset);
        }
    }
}
</script>
<style scoped lang="scss">
    .form-label {
        font-size: 12px;
    }
</style>