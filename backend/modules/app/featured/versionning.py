import collections


def merge_commit_into_base(commit, base,path=""):
    "merges commit into base"
    if base == None:
        return commit
    for key in commit:
        if key in base:
            path+=str(key)
            if isinstance(base[key], dict) and isinstance(commit[key], dict):
                merge_commit_into_base(commit[key], base[key],path)
            elif base[key] == commit[key]:
                pass  # same leaf value
            elif isinstance(base[key], list) and isinstance(commit[key], list):
                if len(base[key]):
                    if isinstance(base[key][0], collections.Hashable):
                        base[key].extend(set(commit[key]) - set(base[key]))
                    else:
                        k="note_id" if "canvas_notes" in path else "email"
                        base[key] = extends_base_notes_with_commit_nodes(
                            base[key], commit[key],k)
                else:
                    base[key].extend(commit[key])

                base[key].extend(commit[key])
            else:
                base[key] = commit[key]
        else:
            base[key] = commit[key]
    return base


def extends_base_notes_with_commit_nodes(base_n, commit_n,key="note_id"):
    base_n_ids = set(map(lambda n: n[key], base_n))
    c_n_i = list(map(lambda n: n[key], commit_n))
    commit_n_ids = set(c_n_i)
    commit_n_ids = commit_n_ids - base_n_ids
    base_n.extend(
        list(map(lambda i: get_note_by_id(i, c_n_i, commit_n), commit_n_ids))
    )
    return base_n


def get_note_by_id(id, note_id_collection, note_collection):
    return note_collection[note_id_collection.index(id)]
