import pusher


class _Pusher:
    pusher_client = pusher.Pusher(
        app_id="690424",
        key="4f777716babc57b94acb",
        secret="c8d32002130396a8d12a",
        cluster="eu",
        ssl=True,
    )

    def __init__(self, env="development"):
        if env == "production":
            self.pusher_client = pusher.Pusher(
                app_id="690426",
                key="badc896ad3819312d807",
                secret="23e61cc3b5a19566ffa9",
                cluster="eu",
                ssl=True,
            )

    def push_notification(self, canvas_id, note_schema):
        self.pusher_client.trigger(canvas_id, "verdict_notification", note_schema)
        # print(canvas_id)
