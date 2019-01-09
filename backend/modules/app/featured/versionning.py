from dictdiffer import diff, patch, swap, revert 
def update_base_by_commit(base,commit):
    changes=diff(base,commit)
    return list(changes),patch(changes,base)