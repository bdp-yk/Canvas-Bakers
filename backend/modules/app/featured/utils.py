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
    "problem":"Problem",  
    "cost-structure":"Key Metrics", 
    "solution":"Solution",
    "unique-value-propositions":"Unique Value Proposition",
    "revenue":"Unfair Advantage",
}

def standarize_field_name(field_name):
   return prototype_fields_names.get(field_name,"Problem")