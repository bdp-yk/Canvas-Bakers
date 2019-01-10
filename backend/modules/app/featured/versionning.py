from dictdiffer import diff, patch, swap, revert
import json



def update_base_by_commit(base, commit,version_provider_key="canvas_version_provider",base_version_key="canvas_base_version"):
     
    # in case of conflict, same base version but different
    if base[base_version_key]==commit[base_version_key]:
        changes = diff(base, commit)
        # print(">>", json.dump(list(changes), indent=4, sort_keys=True))
        return patch(changes, base)

    # if i am the owner of the previous commit, then i am responsible
    # or if I uploaded a recent one aswell
    base.update(commit)
    return base