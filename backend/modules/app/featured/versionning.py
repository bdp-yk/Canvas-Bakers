# from ..schemas.canvas import validate_canvas
# from dictdiffer import diff, patch, swap, revert
# import json

# """
# This function simply updates the base with commit modifications,
# but since the merge of these two:
# base={"notes":[A,B]} and commit{"notes":[D,C] }
# will result in
# {"notes":[D,C]}
# so we have to update each note category on its own
# """


# def update_base_by_commit(
#     base,
#     commit,
#     version_provider_key="canvas_version_provider",
#     base_version_key="canvas_base_version",
# ):

#     # in case of conflict, same base version but different
#     if base[base_version_key] == commit[base_version_key]:
#         changes = diff(base, commit)
#         # print(">>", json.dump(list(changes), indent=4, sort_keys=True))
#         return patch(changes, base)

#     # if i am the owner of the previous commit, then i am responsible
#     # or if I uploaded a recent one aswell
#     base.update(commit)
#     return base


# def update_conflict_base_and_commit(base, commit):
#     safe_base, safe_commit = {}, {}
#     if validate_canvas(commit)["ok"] and validate_canvas(base)["ok"]:
#         safe_commit.update(commit["canvas_notes"])
#         safe_base.update(base["canvas_notes"])
#         for note_category in safe_base.keys():
#             base_note_id = [a["note_id"] for a in safe_base[note_category]]
#             for _note in safe_commit[note_category]:
#                 if _note["note_id"] not in base_note_id:
#                     base_note_id.append(_note)
#                 else:
#                     i = base_note_id.index(_note["note_id"])
#                     safe_base[note_category][i] = _note
#     # base.update(commit)
#     # base["canvas_notes"].update(safe_base)
#     changes = diff(base, commit)
#     base = patch(changes, base)
#     changes2 = diff(base["canvas_notes"], safe_base)
#     base["canvas_notes"] = patch(changes2, base["canvas_notes"])
#     return base

from deepmerge import always_merger, Merger, conservative_merger


def merge_list(merger, path, base, nxt):
    if len(nxt) > 0:
        for item in nxt:
            if item not in base:
                base.append(item)
    if base == None:
        base = []
    return base


my_merger = Merger(
    # pass in a list of tuples,with the
    # strategies you are looking to apply
    # to each type.
    [(list, merge_list), (dict, ["merge"])],
    # next, choose the fallback strategies,
    # applied to all other types:
    ["override"],
    # finally, choose the strategies in
    # the case where the types conflict:
    ["override"],
)


def update_conflict_base_and_commit(base, commit):
    return my_merger.merge(base, commit)


# base = {"ez":{"foo": [{"id":"1"}]}}
# next = {"ez":{"foo": [{"id":"1"},{"id":"2"}]}}
# result = my_merger.merge(base, next)
# print("'always_merger':")
# print(result)
