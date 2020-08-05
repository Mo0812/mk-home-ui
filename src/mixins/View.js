import { EventBus } from "@/event.js";
import ViewContainer from "@/components/ViewContainer/ViewContainer";

export default {
    data() {
        return {
            eventBus: EventBus,
            busy: false
        };
    },
    components: {
        ViewContainer
    }
};
