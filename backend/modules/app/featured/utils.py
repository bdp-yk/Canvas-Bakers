import unicodedata


def strip_accents(s):
    return (
        "".join(
            c
            for c in unicodedata.normalize("NFD", s)
            if unicodedata.category(c) != "Mn"
        )
    ).upper()


prototype_fields_names = {
    "customer-segments":"BMC Customer Segments",
    "value-propositions":"BMC Value Proposition",
    "channels":"BMC Channels",
    "customer-relationships":"BMC Customer Relationship",
    "revenue-stream":"BMC Revenue Streams",
    "key-resources":"BMC Key Ressouces",
    "key-activites":"BMC Key Activities",
    "key-partners":"BMC Key Partnerships",
    "cost-structure":"BMC Cost Structure",  
    "problem":"LMC Problem",  
    "cost-structure":"LMC Cost Structure", 
    "solution":"LMC Solution",
    "unique-value-propositions":"LMC Unique Value Proposition",
    "revenue":"LMC Revenue Stream",
}

def standarize_field_name(field_name):
   return prototype_fields_names.get(field_name,"LMC Problem")