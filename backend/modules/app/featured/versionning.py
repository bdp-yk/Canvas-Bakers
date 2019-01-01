import collections


def merge_commit_into_base(commit, base):
    "merges commit into base"
    if base == None:
        return base
    for key in commit:
        if key in base:
            if isinstance(base[key], dict) and isinstance(commit[key], dict):
                merge_commit_into_base(base[key], commit[key])
            elif base[key] == commit[key]:
                pass  # same leaf value
            elif isinstance(base[key], list) and isinstance(commit[key], list):
                if len(base[key]):
                    if isinstance(base[key][0], collections.Hashable):
                        base[key].extend(set(commit[key]) - set(base[key]))
                    else:
                        base[key] = extends_base_notes_with_commit_nodes(
                            base[key], commit[key])
                else:
                    base[key].extend(commit[key])
            else:
                base[key] == commit[key]
        else:
            base[key] = commit[key]
    return base


def extends_base_notes_with_commit_nodes(base_n, commit_n):
    base_n_ids = set(map(lambda n: n["note_id"], base_n))
    commit_n_ids = set(map(lambda n: n["note_id"], commit_n))
    commit_n_ids = commit_n_ids - base_n_ids
    return base_n.extend(list(map(lambda i: get_note_by_id(i, commit_n), commit_n_ids)))


def get_note_by_id(id, note_collection):
    list(map(lambda n: n["note_id"], note_collection)).index(id)
